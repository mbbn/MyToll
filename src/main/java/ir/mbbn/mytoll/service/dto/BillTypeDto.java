package ir.mbbn.mytoll.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BillTypeDto implements Serializable {

    private String billTypeabbrivation;
    private String billTypecategory;
    private String billTypeTitle;
    private String categoryName;

    public String getBillTypeabbrivation() {
        return billTypeabbrivation;
    }

    public void setBillTypeabbrivation(String billTypeabbrivation) {
        this.billTypeabbrivation = billTypeabbrivation;
    }

    public String getBillTypecategory() {
        return billTypecategory;
    }

    public void setBillTypecategory(String billTypecategory) {
        this.billTypecategory = billTypecategory;
    }

    public String getBillTypeTitle() {
        return billTypeTitle;
    }

    public void setBillTypeTitle(String billTypeTitle) {
        this.billTypeTitle = billTypeTitle;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
