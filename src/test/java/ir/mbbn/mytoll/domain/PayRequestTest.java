package ir.mbbn.mytoll.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ir.mbbn.mytoll.web.rest.TestUtil;

public class PayRequestTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PayRequest.class);
        PayRequest payRequest1 = new PayRequest();
        payRequest1.setId(1L);
        PayRequest payRequest2 = new PayRequest();
        payRequest2.setId(payRequest1.getId());
        assertThat(payRequest1).isEqualTo(payRequest2);
        payRequest2.setId(2L);
        assertThat(payRequest1).isNotEqualTo(payRequest2);
        payRequest1.setId(null);
        assertThat(payRequest1).isNotEqualTo(payRequest2);
    }
}
