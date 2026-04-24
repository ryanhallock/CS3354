package edu.utdallas.cs3354.whatt.dto.response;

public class UserSettingsResponse {

    private Long id;
    private String userId;
    private String textSize;
    private String theme;

    public UserSettingsResponse(Long id, String userId, String textSize, String theme) {
        this.id = id;
        this.userId = userId;
        this.textSize = textSize;
        this.theme = theme;
    }

    public Long getId() { return id; }

    public String getUserId() { return userId; }

    public String getTextSize() { return textSize; }

    public String getTheme() { return theme; }
}
