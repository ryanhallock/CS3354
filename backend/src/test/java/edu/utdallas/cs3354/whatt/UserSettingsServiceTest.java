package edu.utdallas.cs3354.whatt;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import edu.utdallas.cs3354.whatt.dto.response.UserSettingsResponse;
import edu.utdallas.cs3354.whatt.entity.User;
import edu.utdallas.cs3354.whatt.entity.embedded.settings.TextSize;
import edu.utdallas.cs3354.whatt.entity.embedded.settings.Theme;
import edu.utdallas.cs3354.whatt.repository.UserRepository;
import edu.utdallas.cs3354.whatt.service.UserSettingsService;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserSettingsServiceTest {

    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserSettingsService service;

    private User alice;

    @BeforeEach
    void setUp() {
        alice = new User("alice", "password", java.util.Set.of());
        // defaults: MEDIUM + LIGHT from UserSettings no-arg constructor
    }

    // getSettings

    @Test
    @DisplayName("getSettings for existing user returns saved preferences")
    void getSettings_existingUser_returnsSavedPreferences() {
        alice.getPreferences().setTextSize(TextSize.LARGE);
        alice.getPreferences().setTheme(Theme.DARK);
        when(repository.findByUsername("alice")).thenReturn(Optional.of(alice));

        UserSettingsResponse response = service.getSettings("alice");

        assertThat(response.textSize()).isEqualTo(TextSize.LARGE);
        assertThat(response.theme()).isEqualTo(Theme.DARK);
    }

    @Test
    @DisplayName("getSettings for missing user throws NoSuchElementException")
    void getSettings_missingUser_throwsException() {
        when(repository.findByUsername("ghost")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getSettings("ghost")).isInstanceOf(java.util.NoSuchElementException.class);
    }

    // updateSettings(username, TextSize)

    @Test
    @DisplayName("updateSettings with TextSize only updates textSize, leaves theme unchanged")
    void updateSettings_textSizeOnly_leavesThemeUnchanged() {
        when(repository.findByUsername("alice")).thenReturn(Optional.of(alice));
        when(repository.save(alice)).thenReturn(alice);

        UserSettingsResponse response = service.updateSettings("alice", TextSize.SMALL);

        assertThat(response.textSize()).isEqualTo(TextSize.SMALL);
        assertThat(response.theme()).isEqualTo(Theme.LIGHT); // default unchanged
    }

    // updateSettings(username, Theme)

    @Test
    @DisplayName("updateSettings with Theme only updates theme, leaves textSize unchanged")
    void updateSettings_themeOnly_leavesTextSizeUnchanged() {
        when(repository.findByUsername("alice")).thenReturn(Optional.of(alice));
        when(repository.save(alice)).thenReturn(alice);

        UserSettingsResponse response = service.updateSettings("alice", Theme.SYSTEM);

        assertThat(response.textSize()).isEqualTo(TextSize.MEDIUM); // default unchanged
        assertThat(response.theme()).isEqualTo(Theme.SYSTEM);
    }

    // updateSettings(username, Theme, TextSize)

    @Test
    @DisplayName("updateSettings with both fields updates both")
    void updateSettings_bothFields_updatesBoth() {
        when(repository.findByUsername("alice")).thenReturn(Optional.of(alice));
        when(repository.save(alice)).thenReturn(alice);

        UserSettingsResponse response = service.updateSettings("alice", Theme.DARK, TextSize.X_LARGE);

        assertThat(response.textSize()).isEqualTo(TextSize.X_LARGE);
        assertThat(response.theme()).isEqualTo(Theme.DARK);
    }

    @Test
    @DisplayName("updateSettings with both null preserves existing values")
    void updateSettings_bothNull_preservesExistingValues() {
        alice.getPreferences().setTextSize(TextSize.LARGE);
        alice.getPreferences().setTheme(Theme.DARK);
        when(repository.findByUsername("alice")).thenReturn(Optional.of(alice));
        when(repository.save(alice)).thenReturn(alice);

        UserSettingsResponse response = service.updateSettings("alice", null, null);

        assertThat(response.textSize()).isEqualTo(TextSize.LARGE);
        assertThat(response.theme()).isEqualTo(Theme.DARK);
    }
}
