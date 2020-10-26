package ir.mbbn.mytoll.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ir.mbbn.mytoll.web.rest.TestUtil;

public class BaseInfoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BaseInfo.class);
        BaseInfo baseInfo1 = new BaseInfo();
        baseInfo1.setId(1L);
        BaseInfo baseInfo2 = new BaseInfo();
        baseInfo2.setId(baseInfo1.getId());
        assertThat(baseInfo1).isEqualTo(baseInfo2);
        baseInfo2.setId(2L);
        assertThat(baseInfo1).isNotEqualTo(baseInfo2);
        baseInfo1.setId(null);
        assertThat(baseInfo1).isNotEqualTo(baseInfo2);
    }
}
