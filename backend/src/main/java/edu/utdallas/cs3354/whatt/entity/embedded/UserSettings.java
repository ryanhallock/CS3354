package edu.utdallas.cs3354.whatt.entity.embedded;

import edu.utdallas.cs3354.whatt.entity.embedded.settings.TextSize;
import edu.utdallas.cs3354.whatt.entity.embedded.settings.Theme;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class UserSettings {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TextSize textSize = TextSize.MEDIUM;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Theme theme = Theme.LIGHT;
}
