package edu.utdallas.cs3354.whatt.dto.request;

public class UserSettingsRequest {

    private String textSize;  // "small" | "medium" | "large" | "x-large"
    private String theme;     // "light" | "dark" | "system"

    public String getTextSize() { return textSize; }

    public String getTheme() { return theme; }

    public void setTextSize(String textSize) { this.textSize = textSize; }

    public void setTheme(String theme) { this.theme = theme; }
}
