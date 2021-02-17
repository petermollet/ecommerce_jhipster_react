package fr.insy2s.service.mapper;


import fr.insy2s.domain.*;
import fr.insy2s.service.dto.CommandLineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link CommandLine} and its DTO {@link CommandLineDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, ClientMapper.class})
public interface CommandLineMapper extends EntityMapper<CommandLineDTO, CommandLine> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "client.id", target = "clientId")
    CommandLineDTO toDto(CommandLine commandLine);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "clientId", target = "client")
    CommandLine toEntity(CommandLineDTO commandLineDTO);

    default CommandLine fromId(Long id) {
        if (id == null) {
            return null;
        }
        CommandLine commandLine = new CommandLine();
        commandLine.setId(id);
        return commandLine;
    }
}
