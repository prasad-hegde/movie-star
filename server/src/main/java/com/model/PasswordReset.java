package com.model;

public class PasswordReset {
    String email;
    String codeSent;
    String password;

    public PasswordReset(String email, String codeSent, String password) {
        this.email = email;
        this.codeSent = codeSent;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCodeSent() {
        return codeSent;
    }

    public void setCodeSent(String codeSent) {
        this.codeSent = codeSent;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
