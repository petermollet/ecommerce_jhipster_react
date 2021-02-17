package fr.insy2s.service.mapper;


import fr.insy2s.domain.*;
import fr.insy2s.service.dto.ClientDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Client} and its DTO {@link ClientDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, AddressMapper.class})
public interface ClientMapper extends EntityMapper<ClientDTO, Client> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "address.id", target = "addressId")
    ClientDTO toDto(Client client);

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "carts", ignore = true)
    @Mapping(target = "removeCart", ignore = true)
    @Mapping(source = "addressId", target = "address")
    Client toEntity(ClientDTO clientDTO);

    default Client fromId(Long id) {
        if (id == null) {
            return null;
        }
        Client client = new Client();
        client.setId(id);
        return client;
    }
}
