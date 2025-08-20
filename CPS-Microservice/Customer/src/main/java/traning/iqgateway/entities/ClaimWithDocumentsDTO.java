package traning.iqgateway.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ClaimWithDocumentsDTO {

	@JsonProperty("claim")
	private ClaimsEO claim;

	@JsonProperty("documents")
	private DocumentsDTO documents;

	public ClaimWithDocumentsDTO() {
	}

	public ClaimWithDocumentsDTO(ClaimsEO claim, DocumentsDTO documents) {
		this.claim = claim;
		this.documents = documents;
	}

	public ClaimsEO getClaim() {
		return claim;
	}

	public void setClaim(ClaimsEO claim) {
		this.claim = claim;
	}

	public DocumentsDTO getDocuments() {
		return documents;
	}

	public void setDocuments(DocumentsDTO documents) {
		this.documents = documents;
	}

	@Override
	public String toString() {
		return "ClaimWithDocumentsDTO{" + "claim=" + claim + ", documents=" + documents + '}';
	}
}
