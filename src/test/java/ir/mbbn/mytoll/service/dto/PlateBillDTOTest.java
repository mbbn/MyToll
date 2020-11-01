package ir.mbbn.mytoll.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ir.mbbn.mytoll.web.rest.TestUtil;

public class PlateBillDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlateBillDTO.class);
        PlateBillDTO plateBillDTO1 = new PlateBillDTO();
        plateBillDTO1.setId(1L);
        PlateBillDTO plateBillDTO2 = new PlateBillDTO();
        assertThat(plateBillDTO1).isNotEqualTo(plateBillDTO2);
        plateBillDTO2.setId(plateBillDTO1.getId());
        assertThat(plateBillDTO1).isEqualTo(plateBillDTO2);
        plateBillDTO2.setId(2L);
        assertThat(plateBillDTO1).isNotEqualTo(plateBillDTO2);
        plateBillDTO1.setId(null);
        assertThat(plateBillDTO1).isNotEqualTo(plateBillDTO2);
    }
}
