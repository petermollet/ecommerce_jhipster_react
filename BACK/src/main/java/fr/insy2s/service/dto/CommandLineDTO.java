package fr.insy2s.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link fr.insy2s.domain.CommandLine} entity.
 */
public class CommandLineDTO implements Serializable {
    
    private Long id;

    @NotNull
    @Min(value = 0)
    private Integer quantity;


    private Long productId;

    private Long clientId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CommandLineDTO)) {
            return false;
        }

        return id != null && id.equals(((CommandLineDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommandLineDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", productId=" + getProductId() +
            ", clientId=" + getClientId() +
            "}";
    }
}
