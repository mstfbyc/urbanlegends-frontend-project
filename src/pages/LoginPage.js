import React from 'react';
import '../css/SignupStyle.css'
import '../bootstrap-override.scss'
import avatar from '../images/avatar.png'
import {login, signup} from '../api/apiCalls'
import Input from "../components/Input";
import {withTranslation} from "react-i18next";

class LoginPage extends React.Component{
    state ={
        username:null,
        password:null,
        pendingApiCall:false,
        errors:{

        }
    };
    onChange = event =>{
        const {t} = this.props;
        const {name,value}=event.target;
        const errors ={...this.state.errors}
        errors[name]=undefined;
        this.setState({
            [name]:value,
            errors
        });
    }
    onClickLogin = async event =>{
        event.preventDefault();
        const {username,displayName,password} = this.state;
        const creds ={
            username,
            password
        };
        this.setState({pendingApiCall:true});
        try {
            const response = await  login(creds);
        }catch (error){
            if(error.response.data.validationErrors){
                this.setState({errors:error.response.data.validationErrors});
            }
        }
        this.setState({pendingApiCall:false});
    }

    render(){
        const {t} = this.props;
        const {pendingApiCall,errors} = this.state
        const {username,password} = errors;
        console.log(username)
        return(
            <div className="contact-form">
                <img alt="" className="avatar" src={avatar}/>
                <h2>{t('Login')}</h2>
                <form>
                    <Input name="username" label={t("Username")} error = {username} onChange={this.onChange} placeholder={t("Enter Username")} type="text"/>
                    <Input name="password" label={t("Password")} error = {password} onChange={this.onChange} placeholder={t("Enter Password")}  type="password"/>

                    <button disabled={pendingApiCall} onClick={this.onClickLogin} type="button" >
                        {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}{t('Login')} </button>
                </form>
            </div>
        );
    }
}//High Order componet
const UserLoginPageWithTranslation = withTranslation()(LoginPage);
export default UserLoginPageWithTranslation;