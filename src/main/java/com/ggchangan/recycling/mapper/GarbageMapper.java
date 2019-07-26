package com.ggchangan.recycling.mapper;

import com.ggchangan.recycling.entity.Garbage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface GarbageMapper {
    @Select("SELECT * FROM garbage WHERE kind = #{kind}")
    List<Garbage> getByKind(@Param("kind") String kind);
}
