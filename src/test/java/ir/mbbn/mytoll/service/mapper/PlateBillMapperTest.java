package ir.mbbn.mytoll.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PlateBillMapperTest {

    private PlateBillMapper plateBillMapper;

    @BeforeEach
    public void setUp() {
        plateBillMapper = new PlateBillMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(plateBillMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(plateBillMapper.fromId(null)).isNull();
    }
}
