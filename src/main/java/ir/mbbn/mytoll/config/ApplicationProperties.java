package ir.mbbn.mytoll.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to My Toll.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final SepandarTax tax = new SepandarTax();
    private final SepandarPayment payment = new SepandarPayment();

    public SepandarTax getTax() {
        return tax;
    }

    public SepandarPayment getPayment() {
        return payment;
    }

    public static class SepandarTax {

        private String schema;
        private String host;
        private int port;
        private String username;
        private String password;
        private String appId;
        private String orgId;

        public String getSchema() {
            return schema;
        }

        public void setSchema(String schema) {
            this.schema = schema;
        }

        public String getHost() {
            return host;
        }

        public void setHost(String host) {
            this.host = host;
        }

        public int getPort() {
            return port;
        }

        public void setPort(int port) {
            this.port = port;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getAppId() {
            return appId;
        }

        public void setAppId(String appId) {
            this.appId = appId;
        }

        public String getOrgId() {
            return orgId;
        }

        public void setOrgId(String orgId) {
            this.orgId = orgId;
        }
    }

    public static class SepandarPayment extends SepandarTax {

        private String accountNo;
        private String callBackUrl;
        private String failureCallBackUrl;
        private String callBackUrlService;

        public String getAccountNo() {
            return accountNo;
        }

        public void setAccountNo(String accountNo) {
            this.accountNo = accountNo;
        }

        public String getCallBackUrl() {
            return callBackUrl;
        }

        public void setCallBackUrl(String callBackUrl) {
            this.callBackUrl = callBackUrl;
        }

        public String getFailureCallBackUrl() {
            return failureCallBackUrl;
        }

        public void setFailureCallBackUrl(String failureCallBackUrl) {
            this.failureCallBackUrl = failureCallBackUrl;
        }

        public String getCallBackUrlService() {
            return callBackUrlService;
        }

        public void setCallBackUrlService(String callBackUrlService) {
            this.callBackUrlService = callBackUrlService;
        }
    }
}
