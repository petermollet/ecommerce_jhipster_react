package fr.insy2s.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.insy2s.web.rest.TestUtil;

public class CommandLineTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommandLine.class);
        CommandLine commandLine1 = new CommandLine();
        commandLine1.setId(1L);
        CommandLine commandLine2 = new CommandLine();
        commandLine2.setId(commandLine1.getId());
        assertThat(commandLine1).isEqualTo(commandLine2);
        commandLine2.setId(2L);
        assertThat(commandLine1).isNotEqualTo(commandLine2);
        commandLine1.setId(null);
        assertThat(commandLine1).isNotEqualTo(commandLine2);
    }
}
