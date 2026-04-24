package edu.utdallas.cs3354.whatt.dto.response;

import edu.utdallas.cs3354.whatt.entity.embedded.settings.TextSize;
import edu.utdallas.cs3354.whatt.entity.embedded.settings.Theme;

public record UserSettingsResponse(TextSize textSize, Theme theme) {}
