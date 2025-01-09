export type Answer = 'Y' | 'PY' | 'PN' | 'N' | 'NI' | 'SY' | 'WY' | 'WN' | 'SN';
export type BiasRisk = 'LOW' | 'MODERATE' | 'SERIOUS' | 'CRITICAL';

export interface BiasAssessment {
    risk: BiasRisk;
    rationale: string;
}

// Domain 1: Confounding
export interface BiasConfoundingDomain {
    criticalConfounders: Answer;
    confoundersAppropriatelyMeasured: Answer;
    confoundersBalanced: Answer;
    interventionDiscontinuation: Answer;
    appropriateAnalysis: Answer;
}

// Domain 2: Selection (already implemented)
export interface BiasClassificationDomain {
    interventionDefinition: Answer;
    informationRecorded: Answer;
    participantsIncluded: Answer;
    classificationInfluenced: Answer;
    interventionClassified: Answer;
}

// Domain 3: Missing Data
export interface BiasMissingDataDomain {
    dataAvailable: Answer;
    participantsExcluded: Answer;
    reasonsReported: Answer;
    proportionMissing: Answer;
    potentialImpact: Answer;
}

// Domain 4: Measurement
export interface BiasMeasurementDomain {
    methodsAppropriate: Answer;
    differentialMeasurement: Answer;
    assessorsBlinded: Answer;
    errorSystematic: Answer;
}

// Domain 5: Deviations
export interface BiasDeviationsDomain {
    deviationsBalanced: Answer;
    deviationsAffectOutcome: Answer;
    deviationsReported: Answer;
    appropriateAnalysis: Answer;
}

// Domain 6: Reporting
export interface BiasReportingDomain {
    analysisPreSpecified: Answer;
    multipleAnalyses: Answer;
    subgroupAnalyses: Answer;
    reportingBased: Answer;
}

// Domain 7: Overall
export interface BiasOverallDomain {
    criticalRiskDomains: number;
    seriousRiskDomains: number;
    moderateRiskDomains: number;
    lowRiskDomains: number;
}

// Evaluation functions for each domain
export const evaluateBiasConfounding = (answers: BiasConfoundingDomain): BiasAssessment => {
    // TODO: Implement based on algorithm 1a.png and 1b.png
    return { risk: 'MODERATE', rationale: 'Not yet implemented' };
};

export const evaluateBiasClassification = (answers: BiasClassificationDomain): BiasAssessment => {
    const { 
        interventionDefinition,
        informationRecorded,
        participantsIncluded,
        classificationInfluenced,
        interventionClassified
    } = answers;

    // Following the flowchart logic
    if (interventionDefinition === 'N' || interventionDefinition === 'PN') {
        if (informationRecorded === 'Y' || informationRecorded === 'PY') {
            if (classificationInfluenced === 'N' || classificationInfluenced === 'PN') {
                if (interventionClassified === 'Y' || interventionClassified === 'PY') {
                    return {
                        risk: 'LOW',
                        rationale: 'Low risk of bias based on proper intervention definition, recorded information, and correct classification.'
                    };
                }
            }
        }
    }

    if ((classificationInfluenced === 'WY' || classificationInfluenced === 'NI') &&
        (interventionClassified === 'Y' || interventionClassified === 'PY')) {
        return {
            risk: 'MODERATE',
            rationale: 'Moderate risk due to some concerns with classification influence, though intervention was classified correctly.'
        };
    }

    if (interventionClassified === 'WN' || interventionClassified === 'SN' || 
        interventionClassified === 'NI') {
        return {
            risk: 'SERIOUS',
            rationale: 'Serious risk of bias due to problems with intervention classification.'
        };
    }

    return {
        risk: 'CRITICAL',
        rationale: 'Critical risk of bias due to major issues with intervention definition, classification, or documentation.'
    };
};

export const evaluateBiasMissingData = (answers: BiasMissingDataDomain): BiasAssessment => {
    // TODO: Implement based on algorithm 3.png
    return { risk: 'MODERATE', rationale: 'Not yet implemented' };
};

export const evaluateBiasMeasurement = (answers: BiasMeasurementDomain): BiasAssessment => {
    // TODO: Implement based on algorithm 4a.png and 4b.png
    return { risk: 'MODERATE', rationale: 'Not yet implemented' };
};

export const evaluateBiasDeviations = (answers: BiasDeviationsDomain): BiasAssessment => {
    // TODO: Implement based on algorithm 5.png
    return { risk: 'MODERATE', rationale: 'Not yet implemented' };
};

export const evaluateBiasReporting = (answers: BiasReportingDomain): BiasAssessment => {
    // TODO: Implement based on algorithm 6.png
    return { risk: 'MODERATE', rationale: 'Not yet implemented' };
};

export const evaluateOverallBias = (answers: BiasOverallDomain): BiasAssessment => {
    // TODO: Implement based on algorithm 7.png
    return { risk: 'MODERATE', rationale: 'Not yet implemented' };
};
