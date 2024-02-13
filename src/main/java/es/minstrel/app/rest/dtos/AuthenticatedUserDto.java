package es.minstrel.app.rest.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthenticatedUserDto {

    private String serviceToken;
    private UserInfoDto userInfoDto;

    public AuthenticatedUserDto() {
    }

    public AuthenticatedUserDto(String serviceToken, UserInfoDto userInfoDto) {

        this.serviceToken = serviceToken;
        this.userInfoDto = userInfoDto;

    }

    public String getServiceToken() {
        return serviceToken;
    }

    public void setServiceToken(String serviceToken) {
        this.serviceToken = serviceToken;
    }

    @JsonProperty("user")
    public UserInfoDto getUserInfoDto() {
        return userInfoDto;
    }

    public void setUserInfoDto(UserInfoDto userInfoDto) {
        this.userInfoDto = userInfoDto;
    }

}
