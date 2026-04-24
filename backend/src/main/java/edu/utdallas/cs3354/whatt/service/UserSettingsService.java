package edu.utdallas.cs3354.whatt.service;

import edu.utdallas.cs3354.whatt.dto.request.UserSettingsRequest;
import edu.utdallas.cs3354.whatt.dto.response.UserSettingsResponse;
import edu.utdallas.cs3354.whatt.entity.UserSettings;
import edu.utdallas.cs3354.whatt.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserSettingsService {

    private final UserSettingsRepository repository;

    @Autowired
    public UserSettingsService(UserSettingsRepository repository) {
        this.repository = repository;
    }

    public UserSettingsResponse getSettings(String userId) {
        UserSettings settings = repository.findByUserId(userId)
                .orElseGet(() -> createDefaultSettings(userId));
        return toResponse(settings);
    }

    public UserSettingsResponse updateSettings(String userId, UserSettingsRequest request) {
        UserSettings settings = repository.findByUserId(userId)
                .orElseGet(() -> createDefaultSettings(userId));

        if (request.getTextSize() != null) settings.setTextSize(request.getTextSize());
        if (request.getTheme() != null)    settings.setTheme(request.getTheme());

        return toResponse(repository.save(settings));
    }

    private UserSettings createDefaultSettings(String userId) {
        UserSettings s = new UserSettings();
        s.setUserId(userId);
        return repository.save(s);
    }

    private UserSettingsResponse toResponse(UserSettings s) {
        return new UserSettingsResponse(s.getId(), s.getUserId(), s.getTextSize(), s.getTheme());
    }
}