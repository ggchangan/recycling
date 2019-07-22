package com.ggchangan.recycling.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Garbage {
    private Long id;
    private String name;
    private GarbageKind kind;
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    public Garbage(Long id, String name, GarbageKind kind) {
        this.id = id;
        this.name = name;
        this.kind = kind;
    }
}


