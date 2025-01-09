import { BiasAssessment } from './types';

class ROBINSIAssessment {
    private currentTab: string = 'general';
    private formData: { [key: string]: any } = {};
    private formsContainer: HTMLElement | null;
    private loadedForms: Set<string> = new Set();
    
    constructor() {
        this.formsContainer = document.getElementById('formsContainer');
        if (!this.formsContainer) {
            console.error('Forms container not found');
            return;
        }
        this.initializeEventListeners();
        this.loadFormData();
        this.loadInitialForm();
    }

    private async loadInitialForm(): Promise<void> {
        try {
            await this.loadForm('general');
            // Force display of general form
            const generalForm = document.getElementById('general');
            if (generalForm) {
                generalForm.style.display = 'block';
            } else {
                console.error('General form not found after loading');
            }
        } catch (error) {
            console.error('Error loading initial form:', error);
        }
    }

    private async loadForm(formId: string): Promise<void> {
        if (this.loadedForms.has(formId)) {
            console.log(`Form ${formId} already loaded`);
            return;
        }

        try {
            console.log(`Loading form: ${formId}`);
            const response = await fetch(`forms/${formId}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            
            if (!this.formsContainer) {
                throw new Error('Forms container not found');
            }

            // Parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const formContent = doc.querySelector('.tab-content');
            
            if (!formContent) {
                throw new Error('No form content found');
            }

            // Ensure correct ID
            formContent.id = formId;
            
            // Initially hide the form
            (formContent as HTMLElement).style.display = 'none';
            
            // Add to the container
            this.formsContainer.appendChild(formContent);
            this.loadedForms.add(formId);
            
            // Add form change event listener
            const form = formContent.querySelector('form');
            if (form) {
                form.addEventListener('change', (e) => this.handleFormChange(e));
            }
            
            console.log(`Form loaded: ${formId}`);
        } catch (error) {
            console.error(`Error loading form ${formId}:`, error);
            throw error;
        }
    }

    private initializeEventListeners(): void {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const target = (e.currentTarget as HTMLElement).dataset.tab;
                if (target) {
                    try {
                        await this.loadForm(target);
                        this.switchTab(target);
                    } catch (error) {
                        console.error('Error switching tab:', error);
                    }
                }
            });
        });

        // Navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        if (prevBtn) prevBtn.addEventListener('click', () => this.navigate('prev'));
        if (nextBtn) nextBtn.addEventListener('click', () => this.navigate('next'));
        if (submitBtn) submitBtn.addEventListener('click', () => this.generateReport());
    }

    private switchTab(tabId: string): void {
        console.log(`Switching to tab: ${tabId}`);
        
        // Hide all forms
        if (this.formsContainer) {
            const forms = this.formsContainer.querySelectorAll('.tab-content');
            forms.forEach(form => {
                (form as HTMLElement).style.display = 'none';
            });
        }

        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show selected form
        const selectedForm = document.getElementById(tabId);
        if (selectedForm) {
            selectedForm.style.display = 'block';
            console.log(`Form displayed: ${tabId}`);
        } else {
            console.error(`Form not found: ${tabId}`);
        }

        // Activate nav link
        const selectedLink = document.querySelector(`[data-tab="${tabId}"]`);
        if (selectedLink) {
            selectedLink.classList.add('active');
        }

        this.currentTab = tabId;
        this.updateNavigationButtons();
    }

    private async navigate(direction: 'prev' | 'next'): Promise<void> {
        const tabs = ['general', 'domain1', 'domain2', 'domain3', 'domain4', 'domain5', 'domain6', 'domain7'];
        const currentIndex = tabs.indexOf(this.currentTab);
        
        try {
            if (direction === 'prev' && currentIndex > 0) {
                const targetTab = tabs[currentIndex - 1];
                await this.loadForm(targetTab);
                this.switchTab(targetTab);
            } else if (direction === 'next' && currentIndex < tabs.length - 1) {
                const targetTab = tabs[currentIndex + 1];
                await this.loadForm(targetTab);
                this.switchTab(targetTab);
            }
        } catch (error) {
            console.error('Error navigating:', error);
        }
    }

    private updateNavigationButtons(): void {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        const tabs = ['general', 'domain1', 'domain2', 'domain3', 'domain4', 'domain5', 'domain6', 'domain7'];
        const currentIndex = tabs.indexOf(this.currentTab);

        if (prevBtn) prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        if (nextBtn) nextBtn.style.visibility = currentIndex === tabs.length - 1 ? 'hidden' : 'visible';
        if (submitBtn) submitBtn.style.display = currentIndex === tabs.length - 1 ? 'block' : 'none';
    }

    private handleFormChange(event: Event): void {
        const form = event.target as HTMLFormElement;
        const formId = form.id;
        
        // Save form data
        const formData = new FormData(form);
        const data: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        this.formData[formId] = data;
        this.saveFormData();

        // Update domain assessment if it's a domain form
        if (formId.startsWith('domain')) {
            this.updateDomainAssessment(formId);
        }
    }

    private saveFormData(): void {
        localStorage.setItem('robinsI_formData', JSON.stringify(this.formData));
    }

    private loadFormData(): void {
        const savedData = localStorage.getItem('robinsI_formData');
        if (savedData) {
            this.formData = JSON.parse(savedData);
        }
    }

    private updateDomainAssessment(formId: string): void {
        const resultDiv = document.getElementById(`${formId}Result`);
        if (!resultDiv) return;

        // TODO: Implement domain-specific assessment logic
        const assessment: BiasAssessment = {
            risk: 'MODERATE',
            rationale: 'Assessment pending implementation of domain-specific algorithm.'
        };

        this.displayAssessment(resultDiv, assessment);
        this.updateOverallAssessment();
    }

    private displayAssessment(element: HTMLElement, assessment: BiasAssessment): void {
        const riskElement = element.querySelector('.risk-level');
        const rationaleElement = element.querySelector('.rationale');

        if (riskElement) {
            riskElement.textContent = `Risk Level: ${assessment.risk}`;
            riskElement.className = `risk-level risk-${assessment.risk.toLowerCase()}`;
        }
        if (rationaleElement) {
            rationaleElement.textContent = assessment.rationale;
        }

        element.style.display = 'block';
    }

    private updateOverallAssessment(): void {
        // TODO: Implement overall assessment logic based on domain assessments
    }

    private validateForms(): boolean {
        let isValid = true;
        document.querySelectorAll('form').forEach(form => {
            if (!form.checkValidity()) {
                isValid = false;
                const tabId = form.closest('.tab-content')?.id;
                if (tabId) {
                    document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('incomplete');
                }
            }
        });
        return isValid;
    }

    private generateReport(): void {
        if (!this.validateForms()) {
            alert('Please complete all required fields before generating the report.');
            return;
        }

        console.log('Generating report with data:', this.formData);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ROBINSIAssessment();
});
