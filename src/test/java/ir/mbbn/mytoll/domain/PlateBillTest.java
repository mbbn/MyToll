package ir.mbbn.mytoll.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ir.mbbn.mytoll.web.rest.TestUtil;

public class PlateBillTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlateBill.class);
        PlateBill plateBill1 = new PlateBill();
        plateBill1.setId(1L);
        PlateBill plateBill2 = new PlateBill();
        plateBill2.setId(plateBill1.getId());
        assertThat(plateBill1).isEqualTo(plateBill2);
        plateBill2.setId(2L);
        assertThat(plateBill1).isNotEqualTo(plateBill2);
        plateBill1.setId(null);
        assertThat(plateBill1).isNotEqualTo(plateBill2);
    }
}
