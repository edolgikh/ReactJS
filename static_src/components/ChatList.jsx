import React from 'react';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { List, ListItem } from 'material-ui/List';
import {FloatingActionButton, TextField} from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/content/delete-sweep';
import ContentSend from 'material-ui/svg-icons/content/send';
import PropTypes from "prop-types";
import { push } from 'connected-react-router';
import { addChat } from '../actions/chatActions';
import { deleteChat } from '../actions/chatActions';


class ChatList extends React.Component {
   static propTypes = {
       chats: PropTypes.object.isRequired,
       addChat: PropTypes.func.isRequired,
       deleteChat: PropTypes.func.isRequired,
       push: PropTypes.func.isRequired,
       activeChat: PropTypes.string,
   };

    static defaultProps = {
        activeChat: '',
    };
   state = {
       input: '',
   };

   handleChange = (event) => {
       this.setState({ [event.target.name]: event.target.value });
   };

   handleKeyUp = (event) => {
       if (event.keyCode === 13) { // Enter
           this.handleAddChat();
       }
   };

   handleAddChat = () => {
       if (this.state.input.length > 0) {
           this.props.addChat(this.state.input);
           this.setState({ input: '' });
       }
   };
    handleDeleteChat = (chatId) => {
        this.props.deleteChat(chatId);
    };
    handleNavigate = (link) => {
        this.props.push(link);
    };

    render() {
        console.log("hi from chatList");
       const { chats, activeChat } = this.props;
       const chatElements = Object.keys(chats).map(chatId => (
           <div  key={ chatId } className = {(chatId == activeChat) ? "activeChat": "inactiveChat"} >
           <ListItem
               primaryText={ chats[chatId].title }
               leftIcon={ <ContentSend /> }
               onClick={ () => this.handleNavigate(`/chat/${chatId}`) }
           />
               <button className="deleteChat" onClick={ () => this.handleDeleteChat(chatId) }>
                   <DeleteIcon />
               </button>
           </div>));

        return (
           <List>
               { chatElements }
               <ListItem
                   key="Add new chat"
                   leftIcon={ <AddIcon /> }
                   onClick={ this.handleAddChat }
                   style={ { height: '60px' } }
                   children= {<TextField
                       key="textField"
                       fullWidth
                       name="input"
                       hintText="Добавить новый чат"
                       onChange={ this.handleChange }
                       value={ this.state.input }
                       onKeyUp={ this.handleKeyUp }
                   />}
               />
           </List>
       )
   }
}


const mapStateToProps = ({ chatReducer }) => ({
   chats: chatReducer.chats,
    activeChat: chatReducer.activeChat,

});

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, deleteChat, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);