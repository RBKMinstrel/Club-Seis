package es.minstrel.app.rest.common;

import java.util.Arrays;
import java.util.List;

public class JwtInfo {

    private Long userId;
    private String userName;
    private List<String> roles;

    public JwtInfo(Long userId, String userName, List<String> roles) {

        this.userId = userId;
        this.userName = userName;
        this.roles = roles;

    }

    public JwtInfo(Long userId, String userName, String roles) {

        this.userId = userId;
        this.userName = userName;
        this.roles = Arrays.asList(roles.split(","));

    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getRolesString() {
        StringBuilder stringBuilder = new StringBuilder();

        for (String rol : roles) {
            if (!stringBuilder.isEmpty()) {
                stringBuilder.append(",");
            }
            stringBuilder.append(rol);
        }

        return stringBuilder.toString();
    }

}
