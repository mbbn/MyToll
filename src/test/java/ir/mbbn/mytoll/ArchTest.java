package ir.mbbn.mytoll;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("ir.mbbn.mytoll");

        noClasses()
            .that()
            .resideInAnyPackage("ir.mbbn.mytoll.service..")
            .or()
            .resideInAnyPackage("ir.mbbn.mytoll.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..ir.mbbn.mytoll.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
