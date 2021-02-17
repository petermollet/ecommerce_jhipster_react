package fr.insy2s.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.insy2s.web.rest.TestUtil;

public class CommandLineDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommandLineDTO.class);
        CommandLineDTO commandLineDTO1 = new CommandLineDTO();
        commandLineDTO1.setId(1L);
        CommandLineDTO commandLineDTO2 = new CommandLineDTO();
        assertThat(commandLineDTO1).isNotEqualTo(commandLineDTO2);
        commandLineDTO2.setId(commandLineDTO1.getId());
        assertThat(commandLineDTO1).isEqualTo(commandLineDTO2);
        commandLineDTO2.setId(2L);
        assertThat(commandLineDTO1).isNotEqualTo(commandLineDTO2);
        commandLineDTO1.setId(null);
        assertThat(commandLineDTO1).isNotEqualTo(commandLineDTO2);
    }
}
