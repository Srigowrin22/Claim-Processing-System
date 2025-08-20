package traning.iqgateway.entities;

import java.util.List;

public class ClaimWithDocsDTO {
    private ClaimsEO claim;
    private List<DocumentsEO> documents;

    public ClaimWithDocsDTO(ClaimsEO claim, List<DocumentsEO> documents) {
        this.claim = claim;
        this.documents = documents;
    }

    public ClaimsEO getClaim() {
        return claim;
    }

    public void setClaim(ClaimsEO claim) {
        this.claim = claim;
    }

    public List<DocumentsEO> getDocuments() {
        return documents;
    }

    public void setDocuments(List<DocumentsEO> documents) {
        this.documents = documents;
    }
}
