package fr.insy2s.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link fr.insy2s.domain.ProductType} entity.
 */
public class ProductTypeDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String label;

    @NotNull
    private String codeRef;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getCodeRef() {
        return codeRef;
    }

    public void setCodeRef(String codeRef) {
        this.codeRef = codeRef;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductTypeDTO)) {
            return false;
        }

        return id != null && id.equals(((ProductTypeDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductTypeDTO{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", codeRef='" + getCodeRef() + "'" +
            "}";
    }
}
