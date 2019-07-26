package com.ggchangan.recycling.service;

import com.ggchangan.recycling.entity.Garbage;
import com.ggchangan.recycling.entity.GarbageKind;
import com.ggchangan.recycling.repo.GarbageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GarbageServiceImpl implements GarbageService {
    private final GarbageRepository garbageRepository;

    @Autowired
    public GarbageServiceImpl(GarbageRepository garbageRepository) {
        this.garbageRepository = garbageRepository;
    }

    public List<Garbage> getGarbageByKind(GarbageKind kind) {
        return garbageRepository.getByKind(kind);
    }

    public List<Garbage> getGarbageByKey(String key) {
        return garbageRepository.getByKey(key);
    }
}
