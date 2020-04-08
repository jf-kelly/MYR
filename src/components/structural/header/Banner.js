import React, {Component} from "react";
import {
    Button,
    Icon,
    IconButton,
    Grid
} from "@material-ui/core";

const redirectedNotif = {
    _id: -1,
    title: "Redirection Notice",
    message: "The scene you requested has been moved to a new URL and you have been redirected. Please update your bookmarks.",
    color: "cyan"
};

const localStorageKey = "seenMsgs";

class Banner extends Component {
    constructor(props){
        super(props);

        let widthMediaQuery = window.matchMedia("(max-width: 1130px)");
        this.state = {
            isOpen: true,
            mobile: widthMediaQuery.matches,
            messageIndex: 0,
            currentMessage: undefined,
            messages: [],
            seenMessages: JSON.parse(window.localStorage.getItem(localStorageKey)) || []
        };
        
        widthMediaQuery.addListener((ev) => {
            this.setState({mobile: ev.matches});
        });

        fetch(this.props.endpoint).then(resp => {
            resp.json().then(json => {
                let arr = [];
                if(this.props.redirected){
                    arr = [redirectedNotif].concat(json);
                    
                    const url = window.location.toString();
                    window.history.pushState({}, "", url.substr(0, url.indexOf("?")));
                }else{
                    arr = json;
                }

                //Remove messages that have already been seen
                arr = arr.filter( item => (this.state.seenMessages.indexOf(item._id) < 0) );
                this.setState({messages: arr, currentMessage: arr[0]});
            });
        });
    }

    closeButtonClick = () => {
        //Prevent notification redirects from being pushed to the ignore array
        if(this.state.currentMessage._id !== -1){
            this.state.seenMessages.push(
                this.state.messages[this.state.messageIndex]._id
            );
            window.localStorage.setItem(localStorageKey, 
                JSON.stringify(this.state.seenMessages)
            );
        }
        
        if(this.state.messageIndex + 1 >= this.state.messages.length){
            this.setState({isOpen: false});
        }else{
            this.setState({
                messageIndex: this.state.messageIndex + 1, 
                currentMessage: this.state.messages[this.state.messageIndex + 1]
            });
        }
    }

    renderButtons = () => {
        const style = {
            closeButton: {
                color: this.state.currentMessage.fontColor || "black"
            },
            linkButton: {
                color: this.state.currentMessage.fontColor || "black"
            },
            desktop: {
                marginTop: "8px",
                paddingLeft: "36px",
                paddingRight: "8px",
                textAlign: "right"
            },
            mobile:{
                paddingLeft: "8px",
                alignItems: "center"
            }
        };

        let linkButton = ( <></> );
        if(this.state.currentMessage.link){
            linkButton = (
                <Button variant="outlined" href={this.state.currentMessage.link} target="_blank" style={style.linkButton}>
                    {this.state.currentMessage.linkText || "Details"}
                </Button>
            );
        } 
        
        const closeButton = (
            <IconButton onClick={this.closeButtonClick} style={style.closeButton}>
                <Icon className="material-icons">close</Icon>
            </IconButton>
        );

        return (this.state.mobile ?
            <>
                <Grid item xs={2} style={this.state.mobile ? style.mobile : style.desktop}>
                    {linkButton}
                </Grid>
                <Grid item xs={10} style={{textAlign: "right"}}>
                    {closeButton}
                </Grid>
            </>
            :
            <Grid item xs={3} style={style.desktop}>
                {linkButton}
                {closeButton}
            </Grid>
        );
    }

    renderMessage = () => {
        const style = {
            title: {
                desktop:{
                    paddingLeft: "16px",
                    flexWrap: "nowrap"
                },
                mobile: {
                    alignSelf: "center"
                }
            },
            message: {
                mobile: {
                    paddingLeft: "8px", 
                    paddingRight: "8px"
                },
                desktop: {
                    paddingLeft: "24px",
                    textAlign: "left",
                    flexShrink: "1"
                }
            }
        };

        let title = ( <></> );
        
        if(this.state.currentMessage.title){
            title = (
                <Grid item 
                    xs={
                        Math.round(this.state.currentMessage.title.length/10)
                    } 
                    style={this.state.mobile ? style.title.mobile : style.title.desktop}>
                    <strong>{this.state.currentMessage.title}</strong>
                </Grid>
            );
        }

        return (this.state.mobile ?
            <Grid container direction="column">
                {title}
                <Grid item style={style.message.mobile} xs={12}>{this.state.currentMessage.message}</Grid>
            </Grid>
            :
            <>
                {title}
                <Grid item style={style.message.desktop} xs={10}>{this.state.currentMessage.message}</Grid>
            </>
        );
    }

    renderDesktop = () => {
        return (
            <Grid container direction="row" alignItems="center" wrap="nowrap" style={{paddingBottom: "8px"}}>
                {this.renderMessage()}
                {this.renderButtons()}
            </Grid>
        );
    }

    renderMobile = () => {
        return (
            <>
                <Grid container direction="row" alignItems="center" wrap="nowrap" style={{paddingBottom: "8px"}}>
                    {this.renderMessage()}
                </Grid>
                <Grid container direction="row">
                    {this.renderButtons()}
                </Grid>
            </>
        );
    }

    render = () => {
        return (this.state.isOpen && this.state.currentMessage ? 
            <div style={{
                backgroundColor: this.state.currentMessage.color || "yellow",
                color: this.state.currentMessage.fontColor || "black"
            }}>
                {this.state.mobile ? 
                    this.renderMobile()
                    :
                    this.renderDesktop()
                }
            </div>
            :
            <></>);
    }
}

export default Banner;