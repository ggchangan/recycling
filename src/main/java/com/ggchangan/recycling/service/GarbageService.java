package com.ggchangan.recycling.service;

import com.ggchangan.recycling.entity.Garbage;
import com.ggchangan.recycling.entity.GarbageKind;
import java.util.List;

public interface GarbageService {

    List<Garbage> getGarbageByKind(GarbageKind kind);

    List<Garbage> getGarbageByKey(String key);
}
