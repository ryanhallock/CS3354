package edu.utdallas.cs3354.whatt.service;

import edu.utdallas.cs3354.whatt.dto.response.UserSettingsResponse;
import edu.utdallas.cs3354.whatt.entity.User;
import edu.utdallas.cs3354.whatt.entity.embedded.UserSettings;
import edu.utdallas.cs3354.whatt.entity.embedded.settings.TextSize;
import edu.utdallas.cs3354.whatt.entity.embedded.settings.Theme;
import edu.utdallas.cs3354.whatt.repository.UserRepository;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserSettingsService {

    private final UserRepository repository;

    @Autowired
    public UserSettingsService(UserRepository repository) {
        this.repository = repository;
    }

    public UserSettingsResponse getSettings(String username) {
        UserSettings settings =
                repository.findByUsername(username).orElseThrow().getPreferences();
        return toResponse(settings);
    }

    public UserSettingsResponse updateSettings(String username, TextSize textSize) {
        return updateSettings(username, null, textSize);
    }

    public UserSettingsResponse updateSettings(String username, Theme theme) {
        return updateSettings(username, theme, null);
    }

    public UserSettingsResponse updateSettings(String username, @Nullable Theme theme, @Nullable TextSize textSize) {
        User user = repository.findByUsername(username).orElseThrow();
        UserSettings settings = user.getPreferences();

        if (textSize != null) settings.setTextSize(textSize);
        if (theme != null) settings.setTheme(theme);

        var value = repository.save(user);

        return toResponse(value.getPreferences());
    }

    private UserSettingsResponse toResponse(UserSettings s) {
        return new UserSettingsResponse(s.getTextSize(), s.getTheme());
    }
}
