import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    resources:{
        en:{
            translations:{
                "Sign Up":"Sign Up",
                "Username":"User name",
                "Display Name":"Display Name",
                "Password":"Password",
                "Password Repeat":"Password Repeat",
                "Enter Username":"Enter Username",
                "Enter Display Name":"Enter Display Name",
                "Enter Password":"Enter Password",
                "Enter Password Repeat":"Enter Password Repeat",
                "Login":"Login"
            }
        },
        tr:{
            translations:{
                "Sign Up":"Kayıt Ol",
                "Username":"Kullanıcı adı",
                "Display Name":"Tercih edilen isim",
                "Password":"Parola",
                "Password Repeat":"Parola tekrarı",
                "Enter Username":"Kullanıcı ismi giriniz",
                "Enter Display Name":"Tercih edilen isim firiniz",
                "Enter Password":"Parola giriniz",
                "Enter Password Repeat":"Parola tekrar giriniz",
                "Login":"Giriş"
            }
        }
    },
    fallbackLng:'tr',
    ns:['translations'],
    defaultNS:'translations',
    keySeparator: false,
    interpolation:{
        escapeValue:false,
        formatSeparator:','
    },
    react:{
        wait:true
    }
});

export default i18n