package com.mynx.myca500.commons.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class PatientMetaRequest {

    private List<String> allergies;
    private VaccinesInjections vaccinesInjections;
    @Data
    public static class VaccinesInjections {
        private List<Vaccine> vaccines;
        private List<Injection> injections;

        @Data
        public static class Vaccine{
            private String orderedBy;
            private String administeredBy;
            private String administeredTime;
            private String administeredDate;
            private String facility;
            private String route;
            private String site;
            private String dose;
            private String units;
            private String vaccineNumber;
            private String totalVaccines;
            private String vfcClass;
            private String visProvided;
            private String funding;
            private Boolean successFlag;
            private String vaccineInfo;
            private String vaccineName;
            private String ndc;
            private String cvx;
            private String vaccineInfoFlag;
            private String source;
            private String refusalReason;
            private String refusalNote;
        }

        @Data
        public static class Injection{
            private String orderedBy;
            private String administeredBy;
            private String time;
            private String administeredOn;
            private String expirationDate;
            private String location;
            private String route;
            private String site;
            private String dose;
            private String doseUnits;
            private String frequency;
            private String duration;
            private String durationUnits;
            private String notes;
            private String injectionInfoFlag;
            private String injectionName;
        }
    }

    //List<AppointmentDto> visits;

    private MedsSupplements medsSupplements;
    @Data
    public static class MedsSupplements {
        private List<Med> meds;
        private List<Supplement> supplements;

        @Data
        public static class Med{
            private String direction;
            private String quantity;
            private String whenString;
            private String dispense;
            private String frequency;
            private String duration;
            private String earliestFillDate;
            private String additionalRefills;
            private Boolean activeFlag;
            private String drugName;

        }

        @Data
        public static class Supplement{
            private String direction;
            private String quantity;
            private String whenString;
            private String dispense;
            private String frequency;
            private String duration;
            private String earliestFillDate;
            private String additionalRefills;
            private Boolean activeFlag;
            private String drugName;
        }
    }

    private LabsImagingsProcedures labsImagingsProcedures;
    @Data
    public static class LabsImagingsProcedures {
        List<Lab> labs;
        List<Imaging> imagings;
        List<Procedure> procedures;

        @Data
        public static class Lab{
            private String labName;
            private String sentTo;
            private String expirationDate;
            private String createdDate;
            private String noteForLab;
            private String noteForAdmin;
            private String status;
            private String interpretation;
            private String comment;
        }

        @Data
        public static class Imaging {
            private String imagingName;
            private String sentTo;
            private String expectedDate;
            private String expirationDate;
            private String criticality;
            private String priority;
            private String orderStatus;
            private String reasonForOrder;
            private String instructionsForLab;
            private String noteForLab;
        }

        @Data
        public static class Procedure {
            private String procedureName;
            private String procedureDate;
            private String expirationDate;
            private String dxCode;
            private String orderStatus;
            private String note;
            private String sourceOfService;
        }
    }

    private List<Vitals> vitals;
    @Data
    public static class Vitals{
        private Long patientId;
        private String assessmentDate;
        private Float weight;
        private Float height;
        private Float bmi;
        private Float bloodPressure;
        private Float pulseRate;
        private Float o2Saturation;
        private Float temperature;
        private Float respirationRate;
    }

    private MedicalHistory medicalHistory;

    @Data
    public static class MedicalHistory{
        SocialHistory socialHistory;
        List<MedicalProblem> medicalHistory;
        List<SurgicalProcedure> surgicalHistory;

        @Data
        public static class SocialHistory {
            // Tobacco
            private String tobaccoSachets;
            private String consumesPer;

            // Smoking
            private String packs;
            private String smokesPer;

            // Alcohol
            private String alcoholType;
            private Integer alcoholQuantity;
            private String alcoholPer;

            // Exercise
            private String exerciseType;
            private Integer exerciseTimes;
            private String exercisePer;

            // Recreational Drug Use
            private String drugType;
            private Integer drugQuantity;
            private String drugPer;
        }

        @Data
        public static class MedicalProblem {
            private String icdCode;
            private String date;
            private Boolean active;
        }

        @Data
        public static class SurgicalProcedure {
            private String icdCode;
            private String date;
            private Boolean active;
        }
    }
}
