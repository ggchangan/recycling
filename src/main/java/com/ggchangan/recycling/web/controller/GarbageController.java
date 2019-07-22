package com.ggchangan.recycling.web.controller;

import com.ggchangan.recycling.entity.Garbage;
import com.ggchangan.recycling.entity.GarbageKind;
import com.ggchangan.recycling.service.GarbageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class GarbageController {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(GarbageController.class);

    private final GarbageService garbageService;

    @Autowired
    public GarbageController(GarbageService garbageService) {
        this.garbageService = garbageService;
    }

    @GetMapping("/garbage/{kind}")
    public List<Garbage> getGarbages(@PathVariable String kind) {
        log.info("process=get-garbage, kind={}", kind);
        List<Garbage> garbages = garbageService.getGarbageByKind(GarbageKind.valueOf(kind.toUpperCase()));
        return garbages;
    }

    @GetMapping("/garbage/search/{key}")
    public List<Garbage> getGarbagesByKey(@PathVariable String key) {
        log.info("process=get-garbage-by-key, key={}", key);
        List<Garbage> garbages = garbageService.getGarbageByKey(key);
        return garbages;
    }
}
