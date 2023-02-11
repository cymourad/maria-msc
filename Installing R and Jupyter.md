# How to run R as a jupyter notebook in VS Code?

1. Install `jupyter` (using `conda` or `pip`)

   - `conda install jupyter`
   - `pip install jupyter`
   - make sure you have `jupyter` in your `PATH`. You can check this by running `jupyter notebook` in a terminal. If it works, you should see a browser window open with a jupyter notebook.

2. Install `R`

   - download and install `R` from [https://cran.r-project.org/](https://cran.r-project.org/)
   - make sure you have `R` in your `PATH`. You can check this by running `R` in a terminal. If it works, you should see a `R` prompt.

3. Install `IRkernel` (using `conda` or `pip`)

   - open `R` and run `install.packages('IRkernel')`
   - run `IRkernel::installspec()` to register the kernel in the current R installation

4. Install `R Tools for Visual Studio Code` extension

5. Create a new notebook in VS Code

   - select `R` as the kernel
   - run the first cell to check if everything works
