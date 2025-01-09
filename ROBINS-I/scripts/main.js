class ROBINSIAssessment {
    constructor() {
        this.currentTab = 'general';
        this.formData = {};
        this.loadedForms = new Set();
        this.formsContainer = document.getElementById('formsContainer');
        if (!this.formsContainer) {
            console.error('Forms container not found');
            return;
        }
        this.initializeEventListeners();
        this.loadFormData();
        this.loadInitialForm();
    }
    async loadInitialForm() {
        try {
            await this.loadForm('general');
            // Force display of general form
            const generalForm = document.getElementById('general');
            if (generalForm) {
                generalForm.style.display = 'block';
            }
            else {
                console.error('General form not found after loading');
            }
        }
        catch (error) {
            console.error('Error loading initial form:', error);
        }
    }
    async loadForm(formId) {
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
            formContent.style.display = 'none';
            // Add to the container
            this.formsContainer.appendChild(formContent);
            this.loadedForms.add(formId);
            // Add form change event listener
            const form = formContent.querySelector('form');
            if (form) {
                form.addEventListener('change', (e) => this.handleFormChange(e));
            }
            console.log(`Form loaded: ${formId}`);
        }
        catch (error) {
            console.error(`Error loading form ${formId}:`, error);
            throw error;
        }
    }
    initializeEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const target = e.currentTarget.dataset.tab;
                if (target) {
                    try {
                        await this.loadForm(target);
                        this.switchTab(target);
                    }
                    catch (error) {
                        console.error('Error switching tab:', error);
                    }
                }
            });
        });
        // Navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        if (prevBtn)
            prevBtn.addEventListener('click', () => this.navigate('prev'));
        if (nextBtn)
            nextBtn.addEventListener('click', () => this.navigate('next'));
        if (submitBtn)
            submitBtn.addEventListener('click', () => this.generateReport());
    }
    switchTab(tabId) {
        console.log(`Switching to tab: ${tabId}`);
        // Hide all forms
        if (this.formsContainer) {
            const forms = this.formsContainer.querySelectorAll('.tab-content');
            forms.forEach(form => {
                form.style.display = 'none';
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
        }
        else {
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
    async navigate(direction) {
        const tabs = ['general', 'domain1', 'domain2', 'domain3', 'domain4', 'domain5', 'domain6', 'domain7'];
        const currentIndex = tabs.indexOf(this.currentTab);
        try {
            if (direction === 'prev' && currentIndex > 0) {
                const targetTab = tabs[currentIndex - 1];
                await this.loadForm(targetTab);
                this.switchTab(targetTab);
            }
            else if (direction === 'next' && currentIndex < tabs.length - 1) {
                const targetTab = tabs[currentIndex + 1];
                await this.loadForm(targetTab);
                this.switchTab(targetTab);
            }
        }
        catch (error) {
            console.error('Error navigating:', error);
        }
    }
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        const tabs = ['general', 'domain1', 'domain2', 'domain3', 'domain4', 'domain5', 'domain6', 'domain7'];
        const currentIndex = tabs.indexOf(this.currentTab);
        if (prevBtn)
            prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        if (nextBtn)
            nextBtn.style.visibility = currentIndex === tabs.length - 1 ? 'hidden' : 'visible';
        if (submitBtn)
            submitBtn.style.display = currentIndex === tabs.length - 1 ? 'block' : 'none';
    }
    handleFormChange(event) {
        const form = event.target;
        const formId = form.id;
        // Save form data
        const formData = new FormData(form);
        const data = {};
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
    saveFormData() {
        localStorage.setItem('robinsI_formData', JSON.stringify(this.formData));
    }
    loadFormData() {
        const savedData = localStorage.getItem('robinsI_formData');
        if (savedData) {
            this.formData = JSON.parse(savedData);
        }
    }
    updateDomainAssessment(formId) {
        const resultDiv = document.getElementById(`${formId}Result`);
        if (!resultDiv)
            return;
        // TODO: Implement domain-specific assessment logic
        const assessment = {
            risk: 'MODERATE',
            rationale: 'Assessment pending implementation of domain-specific algorithm.'
        };
        this.displayAssessment(resultDiv, assessment);
        this.updateOverallAssessment();
    }
    displayAssessment(element, assessment) {
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
    updateOverallAssessment() {
        // TODO: Implement overall assessment logic based on domain assessments
    }
    validateForms() {
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
    generateReport() {
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
export {};
