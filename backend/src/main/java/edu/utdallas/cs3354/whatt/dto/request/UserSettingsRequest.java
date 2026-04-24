package edu.utdallas.cs3354.whatt.dto.request;

import edu.utdallas.cs3354.whatt.entity.embedded.settings.TextSize;
import edu.utdallas.cs3354.whatt.entity.embedded.settings.Theme;
import jakarta.annotation.Nullable;

public record UserSettingsRequest(
        @Nullable Theme theme, @Nullable TextSize textSize) {

    public UserSettingsRequest {
        if (theme == null && textSize == null) {
            throw new IllegalArgumentException("Either theme or textSize must be provided");
        }
    }
}
