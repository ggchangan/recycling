package com.ggchangan.recycling.repo;

import com.ggchangan.recycling.entity.Garbage;
import com.ggchangan.recycling.entity.GarbageKind;
import com.ggchangan.recycling.mapper.GarbageMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@Slf4j
public class GarbageRepository {
    @Autowired
    public GarbageMapper garbageMapper;

    private static ArrayList<Garbage> recyclable = new ArrayList<Garbage>() {
        {
            add(new Garbage((long)1, "name1", GarbageKind.RECYCLABLE));
            add(new Garbage((long)2, "name2", GarbageKind.RECYCLABLE));
        }
    };

    private static ArrayList<Garbage>  harmful = new ArrayList<Garbage>() {
        {
            add(new Garbage((long)3, "name1", GarbageKind.HARMFUL));
            add(new Garbage((long)4, "name2", GarbageKind.HARMFUL));
        }
    };

    private static ArrayList<Garbage>  wet = new ArrayList<Garbage>() {
        {
            add(new Garbage((long)5, "name1", GarbageKind.WET));
            add(new Garbage((long)6, "name2", GarbageKind.WET));
        }
    };

    private static ArrayList<Garbage>  dry = new ArrayList<Garbage>() {
        {
            add(new Garbage((long)7, "name1", GarbageKind.DRY));
            add(new Garbage((long)8, "name2", GarbageKind.DRY));
        }
    };

    public static Map<GarbageKind, ArrayList<Garbage>> garbage = new HashMap<GarbageKind, ArrayList<Garbage>>() {
        {
            put(GarbageKind.RECYCLABLE, recyclable);
            put(GarbageKind.HARMFUL, harmful);
            put(GarbageKind.WET, wet);
            put(GarbageKind.DRY, dry);

        }
    };

    public List<Garbage> getByKind(GarbageKind kind) {
        return garbageMapper.getByKind(kind.toString());
    }

    public List<Garbage> getByKey(String key) {
        return new ArrayList<>(recyclable);
    }
}
