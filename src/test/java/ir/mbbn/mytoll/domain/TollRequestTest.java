package ir.mbbn.mytoll.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ir.mbbn.mytoll.web.rest.TestUtil;

public class TollRequestTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TollRequest.class);
        TollRequest tollRequest1 = new TollRequest();
        tollRequest1.setId(1L);
        TollRequest tollRequest2 = new TollRequest();
        tollRequest2.setId(tollRequest1.getId());
        assertThat(tollRequest1).isEqualTo(tollRequest2);
        tollRequest2.setId(2L);
        assertThat(tollRequest1).isNotEqualTo(tollRequest2);
        tollRequest1.setId(null);
        assertThat(tollRequest1).isNotEqualTo(tollRequest2);
    }
}
