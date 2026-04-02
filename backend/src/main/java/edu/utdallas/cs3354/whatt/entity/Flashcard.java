package edu.utdallas.cs3354.whatt.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Flashcard {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flashcard_set_id")
    private FlashcardSet flashcardSet;

    private String title;

    private String description;
}
