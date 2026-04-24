package edu.utdallas.cs3354.whatt.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_settings")
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String userId;

    // Text size: "small", "medium", "large", "x-large"
    @Column(nullable = false)
    private String textSize = "medium";

    // Theme: "light", "dark", "system"
    @Column(nullable = false)
    private String theme = "light";

    public Long getId() { return id; }

    public String getUserId() { return userId; }

    public String getTextSize() { return textSize; }

    public String getTheme() { return theme; }

    public void setId(Long id) { this.id = id; }

    public void setUserId(String userId) { this.userId = userId; }

    public void setTextSize(String textSize) { this.textSize = textSize; }

    public void setTheme(String theme) { this.theme = theme; }
}
