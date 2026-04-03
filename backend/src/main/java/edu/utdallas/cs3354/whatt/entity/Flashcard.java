package edu.utdallas.cs3354.whatt.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(exclude = "flashcardSet")
public class Flashcard {
    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flashcard_set_id")
    private FlashcardSet flashcardSet;

    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    private String answer;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant createdAt;
}
