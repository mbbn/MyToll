package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;

public class BillTypeDto implements Serializable {

    private String billTypeabbrivation;
    private String billTypecategory;
    private String billTypeTitle;

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
}
