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

6. Add `meta` and `metafor` packages

   - open `R` and run `install.packages('meta')`
   - open `R` and run `install.packages('metafor')`

# Python Notebook

1. Create a new notebook in VS Code
2. Create a virtual environment and name it thesis

- `python3 -m venv thesis`

3. Activate the virtual environment
   - `source thesis/bin/activate`
4. Install the required packages
   - `pip install -r requirements.txt`
5. Install the kernel
   - `python -m ipykernel install --user --name thesis --display-name "Python (thesis)"`
6. Deactivate the virtual environment
   - `deactivate`
7. Select the kernel in the notebook
   - `Kernel` -> `Change Kernel` -> `Python (thesis)`
8. Run the first cell to check if everything works
