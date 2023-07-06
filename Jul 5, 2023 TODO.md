1. Change the SIR conversion to simply return the exact measure.

   - SIR is a good approximation of RR.
   - When overall risk is low, RR is a good approximation of OR.
   - Thus, SIR is a good approximation of OR in our case.
   - Chaturvedi, A. K., Mbulaiteye, S. M., & Engels, E. A. (2008). Underestimation of Relative Risks by Standardized Incidence Ratios for AIDS-Related Cancers. Annals of Epidemiology, 18(3), 230–234.

2. Make sure the OR conversion is correct.

   - Test some of the calculations manually.

3. Change beta scale of forest plate to an OR scale.

   - This will make the forest plot more interpretable.
   - `forest(results, atransf=exp) # , xlab="Odds Ratio", slab=slab, cex=.8, col=col, xlim=c(0.1, 10))`

4. Change study name in forest plot.

   - Currently, it is `Study NN`.
   - We want to change to `Author, Year - Cancer Type`.

5. Group studies by cancer type

   - Run a forest plot on each group separately.

6. Create a funnel plot.

   - One overall plot, and one for each cancer type.
   - This will help us see if there is publication bias.

7. Create a production script that runs the entire pipeline.
