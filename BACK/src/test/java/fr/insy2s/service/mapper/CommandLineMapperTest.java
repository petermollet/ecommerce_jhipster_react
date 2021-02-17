package fr.insy2s.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class CommandLineMapperTest {

    private CommandLineMapper commandLineMapper;

    @BeforeEach
    public void setUp() {
        commandLineMapper = new CommandLineMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(commandLineMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(commandLineMapper.fromId(null)).isNull();
    }
}
