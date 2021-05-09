import React from 'react';
import '../css/SignupStyle.css'
import '../bootstrap-override.scss'
import avatar from '../images/avatar.png'
import {signup, chamgeLanguage} from '../api/apiCalls'
import Input from "../components/Input";
import {withTranslation} from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";

class UserSignupPage extends React.Component{
    state ={
        username:null,
        displayName:null,
        password:null,
        passwordRepeat:null,
        pendingApiCall:false,
        errors:{

        }
    };
    onChange = event =>{
        const {t} = this.props;
        const {name,value}=event.target;
        const errors ={...this.state.errors}
        errors[name]=undefined;
        if(name==="password" || name==="passwordRepeat"){
            if(name ==="password" && value !== this.state.passwordRepeat){
                errors.passwordRepeat =t("Password mismatch");
            }else if(name==="passwordRepeat" && value !== this.state.password){
                errors.passwordRepeat =t("Password mismatch");
            }
            else{
                errors.passwordRepeat = undefined;
            }
        }
        this.setState({
            [name]:value,
            errors
        });
    }
    onClickSignup = async event =>{
        event.preventDefault();
        const {username,displayName,password} = this.state;
        const body ={
            username,
            displayName,
            password
        };
        this.setState({pendingApiCall:true});
        try {
            const response = await  signup(body);
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
        const {username,displayName,password, passwordRepeat} = errors;
        console.log(username)
        return(
            <div className="contact-form">
                <img alt="" className="avatar" src={avatar}/>
                <h2>{t('Sign Up')}</h2>
                <form>

                    <Input name="username" label={t("Username")} error = {username} onChange={this.onChange} placeholder={t("Enter Username")} type="text"/>
                    <Input name="displayName" label={t("Display Name")} error = {displayName} onChange={this.onChange} placeholder={t("Enter Display Name")} type="text"/>
                    <Input name="password" label={t("Password")} error = {password} onChange={this.onChange} placeholder={t("Enter Password")}  type="password"/>
                    <Input name="passwordRepeat" label={t("Password Repeat")} error ={passwordRepeat} onChange={this.onChange} placeholder={t("Enter Password Repeat")}  type="password"/>
                    <ButtonWithProgress disable ={pendingApiCall} onClick={ this.onClickSignup} pendingApiCall={pendingApiCall} text={t("Sign Up")} />
                </form>
            </div>
        );
    }
}//High Order componet
const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);
export default UserSignupPageWithTranslation;