package fr.insy2s.service.impl;

import fr.insy2s.service.CommandLineService;
import fr.insy2s.domain.CommandLine;
import fr.insy2s.repository.CommandLineRepository;
import fr.insy2s.service.dto.CommandLineDTO;
import fr.insy2s.service.mapper.CommandLineMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link CommandLine}.
 */
@Service
@Transactional
public class CommandLineServiceImpl implements CommandLineService {

    private final Logger log = LoggerFactory.getLogger(CommandLineServiceImpl.class);

    private final CommandLineRepository commandLineRepository;

    private final CommandLineMapper commandLineMapper;

    public CommandLineServiceImpl(CommandLineRepository commandLineRepository, CommandLineMapper commandLineMapper) {
        this.commandLineRepository = commandLineRepository;
        this.commandLineMapper = commandLineMapper;
    }

    @Override
    public CommandLineDTO save(CommandLineDTO commandLineDTO) {
        log.debug("Request to save CommandLine : {}", commandLineDTO);
        CommandLine commandLine = commandLineMapper.toEntity(commandLineDTO);
        commandLine = commandLineRepository.save(commandLine);
        return commandLineMapper.toDto(commandLine);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommandLineDTO> findAll() {
        log.debug("Request to get all CommandLines");
        return commandLineRepository.findAll().stream()
            .map(commandLineMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<CommandLineDTO> findOne(Long id) {
        log.debug("Request to get CommandLine : {}", id);
        return commandLineRepository.findById(id)
            .map(commandLineMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CommandLine : {}", id);
        commandLineRepository.deleteById(id);
    }
}
