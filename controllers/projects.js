const Project = require('../models/project');

module.exports.index = async (req, res) => {
    const projects = await Project.find({});
    res.render('projects/index', { projects })
}

module.exports.renderNewForm = (req, res) => {
    res.render('projects/new');
}

module.exports.createProject = async (req, res, next) => {
    const project = new Project(req.body.project);
    project.author = req.user._id;
    await project.save();
    req.flash('success', 'Successfully made a new project!');
    res.redirect(`/projects/${project._id}`)
}

module.exports.showProject = async (req, res,) => {
    const { id } = req.params;
    const project = await Project.findById(req.params.id).populate('rooms');
    if (!project) {
        req.flash('error', 'Cannot find that project!');
        return res.redirect('/projects');
    }
    res.render('projects/show', { project });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id)
    if (!project) {
        req.flash('error', 'Cannot find that project!');
        return res.redirect('/projects');
    }
    res.render('projects/edit', { project });
}

module.exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, { ...req.body.project });
    await project.save();
    req.flash('success', 'Successfully updated project!');
    res.redirect(`/projects/${project._id}`)
}

module.exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted project')
    res.redirect('/projects');
}